import gradio as gr
import pandas as pd
import time
import random

def train_model(start_year, end_year):
    """
    Simulated model training process
    """
    if not start_year or not end_year:
        return "Please select both start and end years."
    
    # Simulate training process
    time.sleep(2)  # Simulate some processing time
    
    # Generate some dummy training metrics
    accuracy = round(random.uniform(60, 95), 2)
    total_players = random.randint(500, 1000)
    
    return f"""
    ### 🏆 Training Completed Successfully
    - **Start Year:** {start_year}
    - **End Year:** {end_year}
    - **Model Accuracy:** {accuracy}%
    - **Total Players Processed:** {total_players}
    """

def predict(file):
    """
    Prediction function with enhanced output
    """
    if file is None:
        return pd.DataFrame(columns=["Rank", "Player Name", "Team", "Predicted Points"])
    
    try:
        df = pd.read_csv(file.name)
        
        # Add some dummy predicted points if not present
        if 'Predicted Points' not in df.columns:
            df['Predicted Points'] = [round(random.uniform(50, 150), 2) for _ in range(len(df))]
        
        # Sort by predicted points in descending order
        df = df.sort_values('Predicted Points', ascending=False).reset_index(drop=True)
        df['Rank'] = df.index + 1
        
        # Select and reorder columns
        output_columns = ['Rank', 'Player Name', 'Team', 'Predicted Points']
        
        # Ensure columns exist, create if not
        for col in output_columns:
            if col not in df.columns:
                df[col] = ['N/A'] * len(df)
        
        return df[output_columns]
    
    except Exception as e:
        print(f"Error processing file: {str(e)}")
        return pd.DataFrame(columns=["Rank", "Player Name", "Team", "Predicted Points"])

# Custom CSS (same as previous version)
custom_css = """
    <style>
    :root {
        --primary-color: #1e88e5;
        --secondary-color: #2c3e50;
        --background-dark: #121212;
        --text-color-light: #f4f4f4;
        --card-background: #1e1e1e;
        --accent-color: #4caf50;
    }

    /* Previous CSS stays the same */

    /* Modal Specific Styles */
    .modal-content {
        background-color: var(--card-background) !important;
        border-radius: 12px !important;
        padding: 30px !important;
        max-width: 500px !important;
        margin: auto !important;
        box-shadow: 0 8px 16px rgba(0,0,0,0.2) !important;
    }

    .modal-content h2 {
        color: var(--primary-color) !important;
        text-align: center !important;
        margin-bottom: 20px !important;
    }

    .modal-loading {
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
        justify-content: center !important;
    }

    .modal-loading .loader {
        margin-top: 20px !important;
    }
    </style>
"""

with gr.Blocks(css=custom_css) as demo:
    # State variables
    gr.Markdown("# 🏏 Dream 11 Model Trainer", elem_classes=["title"])
    
    with gr.Row():
        with gr.Column(scale=1):
            gr.Markdown("## 📊 Model Training", elem_classes=["section-header"])
            with gr.Group():
                start_year_train = gr.Dropdown(
                    label="Start Year", 
                    choices=list(range(2010, 2024))
                )
                end_year_train = gr.Dropdown(
                    label="End Year", 
                    choices=list(range(2010, 2024))
                )
                train_button = gr.Button("Train Model", variant="primary")
                train_output = gr.Markdown()
            
        with gr.Column(scale=1):
            gr.Markdown("## 🔮 Prediction", elem_classes=["section-header"])
            with gr.Group():
                start_year_test = gr.Dropdown(
                    label="Start Year", 
                    choices=list(range(2010, 2024))
                )
                end_year_test = gr.Dropdown(
                    label="End Year", 
                    choices=list(range(2010, 2024))
                )
                
                predict_button = gr.Button("Predict", variant="primary")
    
    # New Output Section
    with gr.Row():
        with gr.Column():
            gr.Markdown("## 📋 Model Output", elem_classes=["section-header"])
            output_table = gr.DataFrame(
                headers=["Rank", "Player Name", "Team", "Predicted Points"],
                wrap=True,
                interactive=False
            )

    # Prediction Process
    predict_button.click(
        fn=predict, 
        outputs=[output_table]
    )

    # Training Process
    train_button.click(
        fn=train_model, 
        inputs=[start_year_train, end_year_train], 
        outputs=[train_output]
    )

demo.launch(show_error=True)