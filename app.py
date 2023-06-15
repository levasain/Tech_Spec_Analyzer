from flask import Flask, render_template, request, redirect, session
import pymysql
import bcrypt

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Ключ для сесії Flask

# Налаштування підключення до бази даних MySQL Workbench
app.config['MYSQL_HOST'] = 'localhost'  # Адреса сервера бази даних
app.config['MYSQL_USER'] = 'user'  # Ваше ім'я користувача бази даних
app.config['MYSQL_PASSWORD'] = 'user0112'  # Ваш пароль до бази даних
app.config['MYSQL_DB'] = 'user'  # Назва вашої бази даних

mysql = pymysql.connect(
    host=app.config['MYSQL_HOST'],
    user=app.config['MYSQL_USER'],
    password=app.config['MYSQL_PASSWORD'],
    db=app.config['MYSQL_DB']
)

# Перевірка підключення до бази даних
try:
    with mysql.cursor() as cursor:
        cursor.execute('SELECT VERSION()')
        result = cursor.fetchone()
        print('Connected to MySQL Server version:', result[0])
except pymysql.Error as e:
    print('Error connecting to MySQL:', e)


@app.route('/register', methods=['POST'])
def register():
    firstname = request.form['firstname']
    lastname = request.form['lastname']
    email = request.form['email']
    password = request.form['password']
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    # Виконайте запит на вставку даних користувача в таблицю
    with mysql.cursor() as cursor:
        query = "INSERT INTO users (firstname, lastname, email, password) VALUES (%s, %s, %s, %s)"
        values = (firstname, lastname, email, hashed_password)
        cursor.execute(query, values)
        mysql.commit()

    # Поверніть відповідь користувачеві, наприклад, перенаправте його на сторінку успішної реєстрації
    return redirect('/success')


@app.route('/login', methods=['POST'])
def login():
    email = request.form['email']
    password = request.form['password']

    # Виконайте запит до бази даних для отримання облікових даних користувача за введеним email
    with mysql.cursor() as cursor:
        query = "SELECT * FROM users WHERE email=%s"
        values = (email,)
        cursor.execute(query, values)
        result = cursor.fetchone()

        if result:
            stored_password = result['password']
            if bcrypt.checkpw(password.encode('utf-8'), stored_password.encode('utf-8')):
                # Успішна авторизація, збережіть інформацію про користувача у сесії
                session['email'] = email
                return redirect('/success')
        # Неправильний email або пароль, перенаправте користувача на сторінку логіну з повідомленням про помилку
        return redirect('/login_failed')


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/index')
def index():
    return render_template('index.html')


@app.route('/news')
def news():
    return render_template('news_page.html')


@app.route('/about_us')
def about_us():
    return render_template('about_us_page.html')


@app.route('/contacts')
def contacts():
    return render_template('contacts_page.html')


@app.route('/register_page')
def register_page():
    return render_template('register_page.html')


@app.route('/success')
def success():
    if 'email' in session:
        return f"Welcome, {session['email']}! You are successfully logged in."
    else:
        return redirect('/')


@app.route('/login_failed')
def login_failed():
    return "Invalid email or password. Please try again."


@app.route('/get_started')
def get_started():
    return render_template('data_component_page.html')


if __name__ == '__main__':
    app.run()
