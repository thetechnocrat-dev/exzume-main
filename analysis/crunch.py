import sys, json, numpy as np
# import pandas as pd
# from pd import DataFrame, read_csv
# import matplotlib
# import matplotlib.pyplot as plt

print('Python version ' + sys.version)
print('Pandas version ' + pd.__version__)
print('Matplotlib version ' + matplotlib.__version__)

def read_in():
    lines = sys.stdin.readlines()
    print(lines)
    return json.loads(lines[0])
#
def main():
    lines = read_in()
    np_lines = np.array(lines)
    lines_sum = np.sum(np_lines)
    print lines_sum

#start process
if __name__ == '__main__':
    main()
