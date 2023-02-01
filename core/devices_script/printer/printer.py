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

def codeToString(code):
    match code:
        case printer.PRINTER_STATUS_NO_TONER:
            return 'Out of toner'
        case printer.PRINTER_STATUS_NOT_AVAILABLE:
            return 'Printer not available'
        case printer.PRINTER_STATUS_OFFLINE:
            return 'Printer offline'
        case printer.PRINTER_STATUS_OUT_OF_MEMORY:
            return 'Printer out of memory'
        case printer.PRINTER_STATUS_OUTPUT_BIN_FULL:
            return 'Printer bin is full'
        case printer.PRINTER_STATUS_PAGE_PUNT:
            return 'Printer page punt'
        case printer.PRINTER_STATUS_PAPER_JAM:
            return 'Printer paper jam'
        case printer.PRINTER_STATUS_PAPER_OUT:
            return 'Printer out of paper'  
        case printer.PRINTER_STATUS_PAPER_PROBLEM:
            return 'Printer paper problem'    
        

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
        print("error occurred: ", codeToString(error))
    else:
        #  Do the real work
        win32api.ShellExecute(0, "print", 'output.txt', None,  ".",  0)
    printer.ClosePrinter(prn)


def writeFile(id,pwd):
    with open('./devices_script/printer/input.txt', 'r') as f:
        str = f.read()

    str = str.replace('$NAME$', id)
    str = str.replace('$NATION$', pwd)

    with open('./devices_script/printer/output.txt', 'w') as f:
        f.write(str);

writeFile(sys.argv[1]+' '+sys.argv[2], sys.argv[3])
# startPrint();
# print ('Argument List:', str(sys.argv))