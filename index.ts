import fetch from "node-fetch";
import * as chalk from "chalk";
import * as translate from "@vitalets/google-translate-api";
import { Activity } from "./types";

// https://www.boredapi.com/documentation
let bored_api_url = "https://www.boredapi.com/api/activity";
let friends_count = 1;
friends_count++;
let PRICE_LIMIT = 0.5;

let countActivity = 4; // Управление количеством Занятий

bored_api_url += "?maxprice="+PRICE_LIMIT+"&maxparticipants="+friends_count;

async function fetchActivity(): Promise<Activity> {
    var res = await fetch(bored_api_url);
    return res.json();
}

async function translateString(value: string): Promise<{ text: string }> {
    return await translate(value, {
        to: "ru"
    });
}

function analyzeActivity(activity: Activity) {
    if (activity.price > PRICE_LIMIT) {
        console.warn(chalk.red("Занятие не подходит по стоимости"));
    } else {
        console.log(chalk.green("Занятие подходит по стоимости"));
    }

    if (activity.participants > friends_count) {
        console.warn(chalk.red("В компании не хватит людей для занятия"));
    } else {
        console.warn(chalk.green("В компании достаточно людей для занятия"));
    }
}

function print(activity: Activity) {
    console.log("Уровень финансовых затрат(от 0 до 1): " + activity.price);
    console.log("Требуемое число людей: " + activity.participants);

    analyzeActivity(activity);
}

async function main() {

        fetchActivity()
            .then(activity => {
               // console.log(activity)

                translateString(activity.activity).then(translatedActivity => {
                    console.log("Занятие:", translatedActivity.text);

                    // Если есть тип занятия в ответе
                    if (activity.type) {
                        translateString(activity.type).then(translatedType => {
                            console.log("Тип занятия:", translatedType.text);

                            print(activity);
                        })
                    } else {
                        print(activity);
                    }
                })
            })
}

for(var i = 0; i<countActivity; i++){
    main().catch((error) => console.log(error))
}



