# SimpleHistoryExample.py

import blpapi
import json
from optparse import OptionParser

def parseCmdLine():
    parser = OptionParser(description="Retrieve reference data.")
    parser.add_option("-a",
                      "--ip",
                      dest="host",
                      help="server name or IP (default: %default)",
                      metavar="ipAddress",
                      default="10.8.8.1")
    parser.add_option("-p",
                      dest="port",
                      type="int",
                      help="server port (default: %default)",
                      metavar="tcpPort",
                      default=8194)

    (options, args) = parser.parse_args()

    return options


def main():
    options = parseCmdLine()
    json = "{"
    # Fill SessionOptions
    sessionOptions = blpapi.SessionOptions()
    sessionOptions.setServerHost(options.host)
    sessionOptions.setServerPort(options.port)

    print "Connecting to %s:%s" % (options.host, options.port)
    # Create a Session
    session = blpapi.Session(sessionOptions)

    # Start a Session
    if not session.start():
        print "Failed to start session."
        return

    try:
        # Open service to get historical data from
        if not session.openService("//blp/refdata"):
            print "Failed to open //blp/refdata"
            return

        # Obtain previously opened service
        refDataService = session.getService("//blp/refdata")

        # Create and fill the request for the historical data
        request = refDataService.createRequest("HistoricalDataRequest")
        

        request.getElement("securities").appendValue("IBM US Equity")
        request.getElement("securities").appendValue("MSFT US Equity")
        
       # request.getElement("securities").appendValue("FDDSGDP Index") #deficit as % of GDP


        field_list = ["PX_LAST", "OPEN"]
        for field in field_list:
            request.getElement("fields").appendValue(field)
        request.set("periodicityAdjustment", "ACTUAL")
        request.set("periodicitySelection", "YEARLY")
        request.set("startDate", "19900101")
        request.set("endDate", "20061231")
        request.set("maxDataPoints", 100)
        
        #request.getElement("securities").getValueAs(arr, 0)
        #for x in arr:
        #	print x
        print "Sending Request:", request
        # Send the request
        session.sendRequest(request)

        # Process received events
        while(True):
            # We provide timeout to give the chance for Ctrl+C handling:
            ev = session.nextEvent(500)
            x = 1
            for msg in ev:
                if msg.asElement().name() == "HistoricalDataResponse":
                    json = json + '"' + msg.asElement().getElement("securityData").getElementAsString("security") + '": {' 
                    for datapoint in msg.asElement().getElement("securityData").getElement("fieldData").values():
                        date = datapoint.getElementAsString("date")
                        json = json + '"' + date + '": {'
                        for field in field_list:
                            json = json + '"' + field + '": ' + str(datapoint.getElementAsFloat(field)) + ","
                        json = json[:-1]                        
                        json = json + '},'
                    json = json[:-1]
                    json = json + '},'
            if ev.eventType() == blpapi.Event.RESPONSE:
                # Response completly received, so we could exit
                break
    finally:
        # Stop the session
        json = json[:-1]
        json = json + "}"
        print json
        session.stop()

if __name__ == "__main__":
    print "SimpleHistoryExample"
    try:
        main()
    except KeyboardInterrupt:
        print "Ctrl+C pressed. Stopping..."

__copyright__ = """
Copyright 2012. Bloomberg Finance L.P.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to
deal in the Software without restriction, including without limitation the
rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
sell copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:  The above
copyright notice and this permission notice shall be included in all copies
or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
IN THE SOFTWARE.
"""
