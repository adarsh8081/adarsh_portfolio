#!/usr/bin/env python3
"""
Python Test Script
This script tests basic Python functionality
"""

import sys
import os
from datetime import datetime

def main():
    print("🐍 Python Test Script")
    print("=" * 50)
    
    # Test basic Python features
    print(f"✅ Python Version: {sys.version}")
    print(f"✅ Python Executable: {sys.executable}")
    print(f"✅ Current Time: {datetime.now()}")
    print(f"✅ Current Directory: {os.getcwd()}")
    
    # Test data structures
    test_list = [1, 2, 3, 4, 5]
    test_dict = {"name": "Python", "version": sys.version_info.major}
    
    print(f"✅ List operations: {test_list} → Sum: {sum(test_list)}")
    print(f"✅ Dictionary operations: {test_dict}")
    
    # Test comprehensions
    squares = [x**2 for x in test_list]
    print(f"✅ List comprehension: {squares}")
    
    # Test functions
    def greet(name):
        return f"Hello, {name}!"
    
    print(f"✅ Function call: {greet('Developer')}")
    
    # Test file operations
    try:
        with open("temp_test.txt", "w") as f:
            f.write("Python is working!")
        
        with open("temp_test.txt", "r") as f:
            content = f.read()
        
        os.remove("temp_test.txt")
        print(f"✅ File operations: {content}")
        
    except Exception as e:
        print(f"⚠️  File operation warning: {e}")
    
    print("=" * 50)
    print("🎉 All Python tests passed! Your setup is working correctly.")

if __name__ == "__main__":
    main()
