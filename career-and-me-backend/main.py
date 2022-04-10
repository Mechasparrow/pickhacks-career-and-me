from dataclasses import field
import json
from flask import Flask
from flask import request
from flask import jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db/pickhacks.db'
db = SQLAlchemy(app)
CORS(app)

@app.route('/get-salary-numbers-length')
def salary_count():
    sql = text("SELECT count(*) from 'salary-with-tax'")
    results = db.engine.execute(sql)
    count = int(list(results)[0][0])
    
    return str(count)

@app.route('/fields-of-study-list')
def fields_of_study():
    sql = text('select distinct "Field of Study" FROM "college-majors-by-field-of-study";')
    results = db.engine.execute(sql)
    fields_list = list(map(lambda result: result[0], list(results)))
    print(fields_list)
    return jsonify(fields_list)

@app.route('/majors-for-fields-of-study')
def majors_for_fields_of_study():
    field_of_study = request.args.get('field')
    sql = text(f'select * FROM "college-majors-by-field-of-study" WHERE "Field of Study" = "{field_of_study}";')
    results = db.engine.execute(sql)
    majors_list = list(map(lambda result: result[0], list(results)))
    return jsonify(majors_list)