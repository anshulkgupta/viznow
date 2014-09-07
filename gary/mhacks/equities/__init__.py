import blpapi
import json

class Field():

    def __init__(*args, **kwargs):
        #json = "{"
        json = "["
        # Fill SessionOptions
        sessionOptions = blpapi.SessionOptions()
        sessionOptions.setServerHost('10.8.8.1')
        sessionOptions.setServerPort(8194)

        #print "Connecting to %s:%s" % (options.host, options.port)
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


               field_list = ["LAST_PRICE", "OPEN", "VOLUME", "YEST_LAST_TRADE"] 
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
                    
                    #print "Sending Request:", request
                    
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
                                    json = json + '{"' + "DATE" + '": "' + date + '",'
                                    #json = json + '"' + date + '": {'
                                    for field in field_list:
                                        json = json + '"' + field + '": "' + str(datapoint.getElementAsFloat(field)) + '",'
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
                # json = json + "}"
                json = json + "]"
                return json
                session.stop()