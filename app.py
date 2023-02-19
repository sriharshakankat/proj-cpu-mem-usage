import psutil


# Function to get the CPU and RAM usage
def get_usage():
    cpu_percent = psutil.cpu_percent(interval=1)
    memory = psutil.virtual_memory()
    mem_used = memory.used / 1024 / 1024
    mem_total = memory.total / 1024 / 1024
    mem_percent = memory.percent

    return f"CPU Usage: {cpu_percent}%\nRAM Usage: {mem_used:.2f}MB / {mem_total:.2f}MB ({mem_percent}%)"


if __name__ == '__main__':
    print(get_usage())
