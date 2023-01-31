import win32print as printer
import win32api
import sys

# print ('Number of arguments:', len(sys.argv), 'arguments.')

PRINTER_ERROR_STATES = (
    printer.PRINTER_STATUS_NO_TONER, #262144
    printer.PRINTER_STATUS_NOT_AVAILABLE, #4096
    printer.PRINTER_STATUS_OFFLINE, #128
    printer.PRINTER_STATUS_OUT_OF_MEMORY, #2097152
    printer.PRINTER_STATUS_OUTPUT_BIN_FULL, #2048
    printer.PRINTER_STATUS_PAGE_PUNT, #524288
    printer.PRINTER_STATUS_PAPER_JAM, #8
    printer.PRINTER_STATUS_PAPER_OUT, #16
    printer.PRINTER_STATUS_PAPER_PROBLEM, #64
)


def printer_errorneous_state(prn, error_states=PRINTER_ERROR_STATES):
    prn_opts = printer.GetPrinter(prn)
    status_opts = prn_opts[18]
    for error_state in error_states:
        if status_opts & error_state:
            return error_state
    return 0


def startPrint():
    printer_name = "BK-C310(U) 1" # or get_printer_names()[0]
    prn = printer.OpenPrinter(printer_name)
    error = printer_errorneous_state(prn)
    if error:
        print("ERROR occurred: ", error)
    else:
        print("Printer OK")
        #  Do the real work
        win32api.ShellExecute(0, "print", 'output.txt', None,  ".",  0)
    printer.ClosePrinter(prn)


def writeFile(id,pwd):

    with open('devices_script/printer/input.txt', 'r') as f:
        str = f.read()

    str = str.replace('$CODE$', id)
    str = str.replace('$PWD$', pwd)

    with open('devices_script/printer/output.txt', 'w') as f:
        f.write(str);



writeFile(sys.argv[1]+' '+sys.argv[2], sys.argv[3])
print ('Argument List:', str(sys.argv))