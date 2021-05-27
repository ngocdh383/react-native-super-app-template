# Default config
CODE_PUSH_ANDROID_CMD=""
CODE_PUSH_IOS_CMD=""
ANDROID_ENVS=()
IOS_ENVS=()

# Read build.config file
source "./build.config"

# CODE_PUSH_ANDROID_CMD="appcenter codepush release-react -a NextRMT/NextRTM-RSO-Android -b main.jsbundle -d"
# CODE_PUSH_IOS_CMD="appcenter codepush release-react -a NextRMT/NextRTM-RSO-IOS -b main.jsbundle -d"

# Print Logo
echo ""
echo "██████╗ ███████╗██████╗ ██╗      ██████╗ ██╗   ██╗"
echo "██╔══██╗██╔════╝██╔══██╗██║     ██╔═══██╗╚██╗ ██╔╝"
echo "██║  ██║█████╗  ██████╔╝██║     ██║   ██║ ╚████╔╝ "
echo "██║  ██║██╔══╝  ██╔═══╝ ██║     ██║   ██║  ╚██╔╝  "
echo "██████╔╝███████╗██║     ███████╗╚██████╔╝   ██║   "
echo "╚═════╝ ╚══════╝╚═╝     ╚══════╝ ╚═════╝    ╚═╝   "
echo ""

# Function push code by platform
function push(){
	if [ "$1" == "Android" ]; then
	    $CODE_PUSH_ANDROID_CMD $2
	elif [ "$1" == "iOS" ]; then
      $CODE_PUSH_IOS_CMD $2
	fi
}

# Function confirm prompt
function finalConfirm(){
	echo ""
	echo "============================================================"
	echo "⚠️ ⚠️ ⚠️  Please recheck information before deploying ⚠️ ⚠️ ⚠️"
	echo "============================================================"
	echo "           Platform: $1"
	echo "         Evironment: $2"
	echo ""
	printf "Confirm [y/n]: "
	read -r confirm
	
	if [[ "$confirm" == "y" ]] || [[ "$confirm" == "Y" ]]; then
		if push $1 " -b main.jsbundle -d $2"; then
			echo ""
			echo "        ********************************************"
			echo "        *    🍻🍻🍻     Push code DONE     🍻🍻🍻  *"
			echo "        ********************************************"
			echo ""
		fi
	else
		echo "canceled."
		exit 0
	fi
}

# Choose Platform
echo ""
echo "Which Platform to push code?"
echo "  1. Android 🤖"
echo "  2. iOS 🍎"
echo "  0. Exit"
printf "Your option: "
read -r platform

if [[ $platform == 0 ]];  then
	echo "Quit."
	exit 0
elif [[ $platform -ge 3 ]]; then
    echo ""
	echo "❌ Platfrom pption invalid."
	exit 0
elif [[ $platform == 1 ]] && [[ $CODE_PUSH_ANDROID_CMD == "" ]]; then
    echo ""
	echo "❌ Must config CODE_PUSH_ANDROID_CMD for Android in build.config"
	exit 0
elif [[ $platform == 2 ]] && [[ $CODE_PUSH_IOS_CMD == "" ]]; then
	echo ""
	echo "❌ Must config CODE_PUSH_IOS_CMD for Ios in build.config"
	exit 0
fi

# Get list environment by platform
envs=()
if [[ $platform == 1 ]]; then # Android
	envs=(${ANDROID_ENVS[*]})
else # Ios
	envs=("${IOS_ENVS[@]}") 
fi

# Choose Environment

num_of_envs=${#envs[*]}
echo ""
if [[ $num_of_envs == 0 ]]; then
    echo "Which environment to push code? (💡 Must config ANDROID_ENVS and IOS_ENVS in build.config fisrt!!!)"
else
    echo "Which environment to push code?"
fi

for (( i=0; i<${num_of_envs}; i++ ))
do
	echo "  $(($i+1)). ${envs[$i]}"
done
echo "  0. Exit"
printf "Your option: "
read -r env

selected_env=$(($env-1))
if [[ $selected_env -eq -1 ]];  then
	echo "Quit."
	exit 0
elif [[ $selected_env -ge $num_of_envs ]]; then
	echo "❌ Environment option invalid."
	exit 0
fi

# Confirm and push code by platform and environment
if [ "$platform" == "1" ]; then
	finalConfirm "Android" "${envs[selected_env]}"
elif [ "$platform" == "2" ]; then
	finalConfirm "iOS" "${envs[selected_env]}"
fi

# Wait press any key for window
if [[ "$OSTYPE" != "darwin"* ]]; then
  echo "Press any key to exit!"
  read
fi
