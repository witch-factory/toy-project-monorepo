package main

import (
	"fmt"

	"github.com/fatih/color"
)

func main() {
	fmt.Printf("%v %v\n", color.RedString("Hello"), color.GreenString("World"))
}