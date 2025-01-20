import time, datetime, random

def run_curr_hist():
    tstamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    hum = random.randint(0, 100)
    temp = random.randint(0, 33)
    airq = random.randint(0, 500)
    write_str = '{},{},{},{}\n'.format(tstamp, temp, hum, airq)

    with open('current_data.csv', 'w') as fc:
        print('current ->', write_str[:-1])
        fc.write(write_str)

    with open('historical_data.csv', 'a') as fh:
        print('historical ->', write_str[:-1])
        fh.write(write_str)
        
while True:
    run_curr_hist()
    print()
    time.sleep(1)
