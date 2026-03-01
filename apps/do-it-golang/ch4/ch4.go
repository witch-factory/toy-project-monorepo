package main

import "fmt"

func main(){
	var intValue int=42;
	var floatValue = float64(intValue);

	fmt.Printf("intValue: %d, floatValue: %f\n", intValue, floatValue);

	var s string = "123"
	var asc int = int(s[1]);

	fmt.Printf("s: %s, asc: %d\n", s, asc);
}
