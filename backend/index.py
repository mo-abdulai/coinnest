from flask import Flask, jsonify
import pandas as pd
import requests
import matplotlib.pyplot as plt
import datetime
# from sklearn.linear_model import LinearRegression
# from sklearn.model_selection import train_test_split
# from sklearn.metrics import mean_squared_error
from dotenv import load_dotenv
from flask_mail import Mail, Message
from flask import Flask, render_template_string
load_dotenv()
import os

app = Flask(__name__)

from flask import Flask
from flask_mail import Mail, Message

app = Flask(__name__)

# Configuration for Flask-Mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.getenv("USERNAME")
app.config['MAIL_PASSWORD'] = os.getenv("PASSWORD")
app.config['MAIL_DEFAULT_SENDER'] = os.getenv("SENDER")

mail = Mail(app)


API_URL = 'https://api.coinranking.com/v2'

# Set request headers for coinranking api
headers = {
  'x-access-token': os.getenv("COIN_KEY")
}

def send_email(subject, recipients, body):
    try:
        msg = Message(
            subject=subject,
            recipients=[recipients],  # Replace with recipient's email address
            body=body
            # subject=subject,
            # recipients=[recipients],
            # body=body
        )
        mail.send(msg)
        return "Email sent successfully!"
    except Exception as e:
        return str(e)


@app.route('/') # ‘https://www.google.com/‘
    
def get_cryptocurrencies():
    try:
        # Make GET request to CoinRanking API with API key
        response = requests.get(API_URL + '/coin/Qwsogvtv82FCd/history?timePeriod=1h', headers)

        # Check if request was successful
        if response.status_code == 200:
            price_date_list = []
            datas = response.json()['data']['history']
            highest_price = 0
            highest_price_data = {}
            # if data[0].price > 60000:
            for data in datas:
                price = float(data['price'])
                if price > highest_price:
                    highest_price = price
                    timestamp = data['timestamp']
                    date_time = datetime.datetime.fromtimestamp(timestamp)
                    formatted_date = date_time.strftime('%Y-%m-%d %H:%M:%S')
                    highest_price_data = {'price': highest_price, 'date': formatted_date}

                    # print(f"${price} {formatted_date}")
            threshold_price = 63000
            if highest_price > threshold_price:
                subject = "Cryptocurrency Highest Price Alert"
                recipient = os.getenv("RECEPIENT")  # Replace with recipient's email address
                body = f"The highest price of the cryptocurrency in the past 24 hours has exceeded {threshold_price}. Current highest price: {highest_price} at {highest_price_data['date']}"
                email_status = send_email(subject, recipient, body)
                print(email_status)       
                 

            return jsonify(data)
            #use line plot to draw data

    except Exception as e:
        # Handle any exceptions
        return jsonify({'error': str(e)}), 500

app.run(debug=True)
