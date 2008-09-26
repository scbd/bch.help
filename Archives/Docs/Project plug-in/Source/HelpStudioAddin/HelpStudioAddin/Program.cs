using System;
using System.Collections.Generic;
using System.Text;

namespace HelpStudioAddin
{
    class Program
    {
        static void Main(string[] args)
        {
            Bridge xmlBridge = new Bridge();

            xmlBridge.writeToXML("3082.xml", "..//project.3082.hsl");
            xmlBridge.writeToXML("3073.xml", "..//project.3073.hsl");
            xmlBridge.writeToXML("1049.xml", "..//project.1049.hsl");
            xmlBridge.writeToXML("1036.xml", "..//project.1036.hsl");
            xmlBridge.writeToXML("2052.xml", "..//project.2052.hsl");
        }
    }
}
