import sys
import os
import mkdocs.commands.serve
from watchdog.observers.polling import PollingObserver

# Monkey-patch watchdog.observers.Observer to be PollingObserver
import watchdog.observers
watchdog.observers.Observer = PollingObserver

import logging
logging.basicConfig(level=logging.INFO)

from mkdocs.commands.serve import serve

if __name__ == "__main__":
    # Use the directory where the script is located
    script_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(script_dir)
    config_file = "mkdocs.yml"
    
    print("Starting MkDocs with PollingObserver patched...")
    
    try:
        # We use a explicit watch path as well
        serve(config_file=config_file, dev_addr="127.0.0.1:8000", watch=["brd"])
    except KeyboardInterrupt:
        print("Stopping...")
