#!/bin/bash

make pdf || exit 1

cp build/pdf/Koverse\ Manual.pdf $1