using System;
using System.Collections.Generic;
using System.Text;
using System.Xml;

namespace HelpStudioAddin
{
    class Bridge
    {
        public void writeToXML(string sourcePath,string destinationPath)
        {


            //Load the source file
            XmlTextReader myReader = new XmlTextReader(sourcePath);
            XmlDocument mySourceDoc = new XmlDocument();
            mySourceDoc.Load(myReader);
            myReader.Close();


            //Load the destination file
            myReader = new XmlTextReader(destinationPath);
            XmlDocument myDestDoc = new XmlDocument();
            myDestDoc.Load(myReader);
            myReader.Close();

            //Verify if already exist the properties
            XmlNodeList verifNodeList = myDestDoc.GetElementsByTagName("tpv");

            if (verifNodeList.Count == 0) 
            {
                // Move from an xml to the other 
                XmlNode rootDest = myDestDoc["HSProjectLocalization"];
                XmlNodeList childs = mySourceDoc["Properties"].ChildNodes;
                foreach (XmlNode nodeOrig in childs)
                {

                    XmlNode nodeDest = myDestDoc.ImportNode(nodeOrig, true);
                    rootDest.AppendChild(nodeDest);
                }

                // Save the modified destination
                XmlTextWriter myWriter = new XmlTextWriter(destinationPath, Encoding.UTF8);
                myWriter.Formatting = Formatting.Indented;
                myDestDoc.WriteTo(myWriter);
                myWriter.Close();
                /*Console.WriteLine("Done");
                Console.ReadKey();*/

            }
        }
    }
}
