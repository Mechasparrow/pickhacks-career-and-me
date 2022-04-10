from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db/pickhacks.db'
db = SQLAlchemy(app)

@app.route('/get-salary-numbers-length')
def salary_count():
    sql = text("SELECT count(*) from 'salary-with-tax'")
    results = db.engine.execute(sql)
    count = int(list(results)[0][0])
    
    return str(count)
