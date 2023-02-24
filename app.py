import psutil
import json
import time


# Function to get the CPU and RAM usage
def get_usage():
    cpu_percent = psutil.cpu_percent(interval=1)
    memory = psutil.virtual_memory()
    mem_used = memory.used / 1024 / 1024
    mem_total = memory.total / 1024 / 1024
    mem_percent = memory.percent

    data = {
        "cpu_usage": cpu_percent,
        "ram_usage": {
            "used": mem_used,
            "total": mem_total,
            "percent": mem_percent
        }
    }

    with open('./data/data.json', 'w') as f:
        json.dump(data, f)


# Continuously write the outputs to the JSON file every 5 seconds
while True:
    get_usage()
    time.sleep(5)

