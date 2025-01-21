start cmd /k "python app.py"
timeout /T 2 /nobreak

start cmd /k "python get_sample_data.py" // for sample data
timeout /T 2 /nobreak

start cmd /k "cd .. && cd frontend && timeout /T 1 /nobreak && npm start"
timeout /T 1 /nobreak
