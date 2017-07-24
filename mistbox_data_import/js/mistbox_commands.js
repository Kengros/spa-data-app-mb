var Commands = [
    {
        id: 1,
        command: "UMode",
        description: "Water saver mode on off,0/1 on off",
        parameterDesc: "on/off, 0/1, true/false"
    },
    {
        id: 2,
        command: "USprayBars",
        description: "Set number of spray bars, (count)",
        parameterDesc: "number 1-255"
    },
    {
        id: 3,
        command: "UTempThreshold",
        description: "Set the temperature at which the unit is activated,",
        parameterDesc: "Temperature in Fahrenheit"
    },
    {
        id: 4,
        command: "UEMIOnThreshold",
        description: "EMI On Threshold (number)",
        parameterDesc: "12-bit data"
    },
    {
        id: 5, command: "UEMIOffThreshold",
        description: "EMI Off Threshold (number)",
        parameterDesc: "12-bit data"
    },
    {
        id: 6, command: "UAcousticOnThreshold",
        description: "Acoustic On Threshold (number)",
        parameterDesc: "12-bit data"
    },
    {
        id: 7, command: "UAcousticOffThreshold",
        description: "Acoustic Off Threshold (number)",
        parameterDesc: "12-bit data"
    },
    {
        id: 8, command: "UMistingOnOff",
        description: "Misting On Off ",
        parameterDesc: "on/off, 0/1, true/false"
    },
    {
        id: 9,
        command: "UMaxNormMistingTime",
        description: "Maximum Normal Misting Time (number seconds)",
        parameterDesc: "1+ units here are seconds"
    },
    {
        id: 10,
        command: "UNormalMistingOffTime",
        description: "Normal misting off time	(number	seconds)",
        parameterDesc: "1+ units here are seconds"
    },
    {
        id: 11,
        command: "UMaxWaterSaverMistingTime",
        description: "Max water saver misting time	(number	seconds)",
        parameterDesc: "1+ units here are seconds"
    },
    {
        id: 12,
        command: "UWaterSaverMistingOffTime",
        description: "Water saver misting off time	(number	seconds)",
        parameterDesc: "1+ units here are seconds"
    },
    {
        id: 13,
        command: "UWiFiCheckInPeriod",
        description: "Server check in period	(number	minutes)",
        parameterDesc: "0-255: 1-255 minutes. 0 = WiFi Disabled"
    }
];