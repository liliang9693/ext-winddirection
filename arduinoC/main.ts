

//% color="#AA888D" iconWidth=50 iconHeight=40
namespace dfr0845_sen0482 {
    
    //% board="arduino, microbit, esp32"
    //% block="Initialize device address [ADDRESS]" blockType="command"
    //% ADDRESS.shadow="range"  ADDRESS.params.min=0 ADDRESS.params.max=255 ADDRESS.defl=2
    export function sen0482_modifyAddress(parameter: any, block: any) {
        
        let add = parameter.ADDRESS.code

        Generator.addInclude("RS485_Wind_Direction_Transmitter", "#include <RS485_Wind_Direction_Transmitter.h>");
        Generator.addObject(`sen0482add`, `uint8_t`, ` sen0482Add = ${add};`);
    }

    //% board="arduino, esp32"
    //% block="Read wind direction, interface [HARDSER] RX:[HARDRX] TX:[HARDTX]" blockType="reporter"
    //% HARDSER.shadow="dropdown" HARDSER.options="HARDSER" 
    //% HARDRX.shadow="dropdown" HARDRX.options="HARDRX"
    //% HARDTX.shadow="dropdown" HARDTX.options="HARDTX"
    export function sen0482_getWindDirection1(parameter: any, block: any) {
        
        let ser =  parameter.HARDSER.code;
        let rx = parameter.HARDRX.code;
        let tx = parameter.HARDTX.code;

        let func = [
			'char *get_direc(int d)',
			'{',
			'   switch(d)',
            '   {',
            '       case 0: return "北";',
            '       case 1: return "东北偏北";',
            '       case 2: return "东北";',
            '       case 3: return "东北偏东";',
            '       case 4: return "东";',
            '       case 5: return "东南偏东";',
            '       case 6: return "东南";',
            '       case 7: return "东南偏南";',
            '       case 8: return "南";',
            '       case 9: return "西南偏南";',
            '       case 10: return "西南";',
            '       case 11: return "西南偏西";',
            '       case 12: return "西";',
            '       case 13: return "西北偏西";',
            '       case 14: return "西北";',
            '       case 15: return "西北偏北";',
            '       default: return "-1";',
            '   }',
			'}',
		];

        Generator.addObject(`windDirection`, `RS485_Wind_Direction_Transmitter`, ` windDirection;`);
        if(Generator.board === 'arduino'){
            Generator.addSetup("sen0482mySerialbegin",`${ser}.begin(9600);`);
        }else if(Generator.board === 'microbit'){
            Generator.addSetup("sen0483mySerialbegin",`Serial.begin(9600);\n\tint receive = g_PinID[${rx}];\n\tint send = g_PinID[${tx}];\n\tMicroBitPin *rxpin = getMicroBitPin(receive);\n\tMicroBitPin *txpin = getMicroBitPin(send);\n\tuBit.serial.redirect(txpin->name, rxpin->name);\n\tuBit.serial.baud((int)9600);`);
        }else if(Generator.board === 'esp32'){
            Generator.addSetup("sen0482mySerialbegin",`${ser}.begin(9600, ${rx}, ${tx});`);
        }
        Generator.addSetup("windDirectionbegin",`windDirection.begin(${ser});`);
        Generator.addSetup("sen0482modify",`windDirection.ModifyAddress(0, sen0482Add);`);
        Generator.addFunction("get_direc", "char *", "get_direc", "int d", func);
        Generator.addCode(`get_direc(windDirection.readWindDirection(sen0482Add))`);
    }

    //% board="arduino, microbit, esp32"
    //% block="Read wind direction, interface [SOTFSER] RX:[SOFTRX] TX:[SOFTTX]" blockType="reporter"
    //% SOTFSER.shadow="dropdown" SOTFSER.options="SOTFSER"
    //% SOFTRX.shadow="dropdown" SOFTRX.options="SOFTRX" 
    //% SOFTTX.shadow="dropdown" SOFTTX.options="SOFTTX"
    export function sen0482_getWindDirection2(parameter: any, block: any) {
        
        let ser =  parameter.SOTFSER.code;
        let rx = parameter.SOFTRX.code;
        let tx = parameter.SOFTTX.code;

        let func = [
			'char *get_direc(int d)',
			'{',
			'   switch(d)',
            '   {',
            '       case 0: return "北";',
            '       case 1: return "东北偏北";',
            '       case 2: return "东北";',
            '       case 3: return "东北偏东";',
            '       case 4: return "东";',
            '       case 5: return "东南偏东";',
            '       case 6: return "东南";',
            '       case 7: return "东南偏南";',
            '       case 8: return "南";',
            '       case 9: return "西南偏南";',
            '       case 10: return "西南";',
            '       case 11: return "西南偏西";',
            '       case 12: return "西";',
            '       case 13: return "西北偏西";',
            '       case 14: return "西北";',
            '       case 15: return "西北偏北";',
            '       default: return "-1";',
            '   }',
			'}',
		];
        
        Generator.addInclude('SoftwareSerial', '#include <SoftwareSerial.h>');
        Generator.addObject(`windDirection`, `RS485_Wind_Direction_Transmitter`, ` windDirection;`);
        Generator.addObject(`sen0482mySerial`, `${ser}`, ` mySerial(${rx},${tx});`);
        Generator.addSetup("sen0482mySerialbegin",`mySerial.begin(9600);`);
        Generator.addSetup("windDirectionbegin",`windDirection.begin(mySerial);`);
        Generator.addSetup("sen0482modify",`windDirection.ModifyAddress(0, sen0482Add);`);
        Generator.addFunction("get_direc", "char *", "get_direc", "int d", func);
        Generator.addCode(`get_direc(windDirection.readWindDirection(sen0482Add))`);
    }
}

