#include <SoftwareSerial.h>
#include "RS485_Wind_Direction_Transmitter.h"

SoftwareSerial mySerial(2, 3); //定义软串口，3号端口为TX，2号端口为RX，

RS485_Wind_Direction_Transmitter windDirection;


uint8_t  Address = 2;


void setup()
{
  Serial.begin(115200);
  mySerial.begin(9600);
  windDirection.begin(mySerial);
  //windDirection.ModifyAddress(0x00, Address);  //设备地址修改,修改地址后请注释掉这句重新上电。
}

void loop()
{
  Serial.println(windDirection.readWindDirection(Address)); //读取风向
  delay(1000);
}