from flask import Flask, jsonify
import pandas as pd
import requests
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error

app = Flask(__name__)

API_URL = 'https://api.coinranking.com/v2'


headers = {
  'x-access-token': 'coinranking35e688d8f9383eba7a8a0564344441cb20f2993b6203acba'
}

@app.route('/') # ‘https://www.google.com/‘

def get_cryptocurrencies():
    try:
        # Make GET request to CoinRanking API with API key
        response = requests.get(API_URL + '/coin/razxDUgYGNAdQ/history?timePeriod=3h', headers)

        # Check if request was successful
        if response.status_code == 200:
            # Extract cryptocurrency data from response
            data = response.json()['data']['history']
    
            # Return cryptocurrency data as JSON response
            # return jsonify(data)
            #use line plot to draw data


# Preprocess data and select features
# For simplicity, let's consider only closing prices as the feature
            X = data['price']
            y = data['timestamp']

            # Split data into training and testing sets
            X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

            # Train the linear regression model
            model = LinearRegression()
            model.fit(X_train.values.reshape(-1, 1), y_train)

            # Make predictions on the testing set
            predictions = model.predict(X_test.values.reshape(-1, 1))

            # Evaluate the model
            mse = mean_squared_error(y_test, predictions)
            print('Mean Squared Error:', mse)
       
            # return jsonify({'message': 'Cryptocurrency data fetched successfully'})
        
        else:
            # Return error message if request failed
            return jsonify({'error': 'Failed to fetch data from CoinRanking API'}), 500
    except Exception as e:
        # Handle any exceptions
        return jsonify({'error': str(e)}), 500

app.run(port=5000)
