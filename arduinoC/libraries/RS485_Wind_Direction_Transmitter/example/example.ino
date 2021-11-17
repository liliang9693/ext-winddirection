#include <SoftwareSerial.h>
#include "RS485_Wind_Direction_Transmitter.h"

SoftwareSerial mySerial(2, 3); //�������ڣ�3�Ŷ˿�ΪTX��2�Ŷ˿�ΪRX��

RS485_Wind_Direction_Transmitter windDirection;


uint8_t  Address = 2;


void setup()
{
  Serial.begin(115200);
  mySerial.begin(9600);
  windDirection.begin(mySerial);
  //windDirection.ModifyAddress(0x00, Address);  //�豸��ַ�޸�,�޸ĵ�ַ����ע�͵���������ϵ硣
}

void loop()
{
  Serial.println(windDirection.readWindDirection(Address)); //��ȡ����
  delay(1000);
}