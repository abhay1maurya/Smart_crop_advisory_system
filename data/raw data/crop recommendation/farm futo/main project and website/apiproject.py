from flask import Flask, request, jsonify
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.preprocessing import LabelEncoder
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
data = pd.read_csv('DataSet.csv')

encoder_dict = {}

categorical_columns = ['divisions', 'States']

for col in categorical_columns:
    encoder = LabelEncoder()
    data[col] = encoder.fit_transform(data[col])
    encoder_dict[col] = encoder

@app.route('/predict_crop', methods=['POST'])
def predict_crop():
    # Get user input from the request
    user_input = request.get_json()

    # Encode categorical columns in user input using label encoding with error handling
    for col in categorical_columns:
        try:
            user_input[col] = encoder_dict[col].transform([user_input[col]])[0]
        except KeyError:
            return jsonify({"error": f"Unseen label '{user_input[col]}' encountered for column '{col}'. Please provide a valid label."})

    # Convert user input to a DataFrame
    user_df = pd.DataFrame([user_input])

    # Use the same encoder to transform the training data
    X = data.drop('label', axis=1)
    y = data['label']

    # Split the dataset into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Initialize the Decision Tree Classifier
    model = DecisionTreeClassifier()

    # Train the model
    model.fit(X_train, y_train)

    # Make predictions
    predicted_label = model.predict(user_df)[0]

    return jsonify({"predicted_crop_label": predicted_label})

if __name__ == '__main__':
    app.run(debug=True)
