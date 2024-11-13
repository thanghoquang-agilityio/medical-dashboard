#!/bin/bash

RED='\033[31m'
GREEN='\033[32m'
YELLOW='\033[33m'
BLUE='\033[34m'
RESET='\033[0m'
BLACK_BG='\033[40m'
RED_BG='\033[41m'
GREEN_BG='\033[42m'
YELLOW_BG='\033[43m'
BLUE_BG='\033[44m'
MAGENTA_BG='\033[45m'
CYAN_BG='\033[46m'
WHITE_BG='\033[47m'

baseTime=3

# Define the starting countdown value
countdown=$baseTime

cols=$(tput cols)

# Infinite loop
while true
do
  clear
  echo "Cronjob by rice is running - Will send request after ${countdown}s remaining"

  if (( countdown == 0 ))
  then

    printf "\r%${cols}s" ""

    echo -e "${BLUE_BG}😘 Start to send request${RESET}"

    printf "\r%${cols}s" ""

    response=$(curl --location 'https://medical-dashboard-api.onrender.com')
    echo "$response"

    printf "\r%${cols}s" ""

    echo -e "${GREEN_BG}🤣 Finished for send request${RESET}"

    printf "\r%${cols}s" ""

    countdown=$baseTime

    sleep 5
  fi

  # Wait for 1 second
  sleep 1

  # Decrement the countdown
  ((countdown--))
done
