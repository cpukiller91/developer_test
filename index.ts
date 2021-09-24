import fetch from "node-fetch";
import * as chalk from "chalk";
import * as translate from "@vitalets/google-translate-api";
import { Activity } from "./types";

// https://www.boredapi.com/documentation
const bored_api_url = "https://www.boredapi.com/api/activity";
let friends_count = 1;
let PRICE_LIMIT = 0.5;

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

    if (activity.participants > friends_count + 1) {
        console.warn(chalk.red("В компании не хватит людей для занятия"));
    } else {
        console.warn(chalk.green("В компании достаточно людей для занятия"));
    }
}

async function main() {
    function print(activity: Activity) {
        console.log("Уровень финансовых затрат(от 0 до 1): " + activity.price);
        console.log("Требуемое число людей: " + activity.participants);

        console.log();

        analyzeActivity(activity);
    }

    fetchActivity()
        .then(activity => {
            translateString(activity.activity).then(translatedActivity => {
                console.log("Занятие:", translatedActivity.text);

                // Если есть тип занятия в ответе
                if (activity.tipe) {
                    translateString(activity.tipe).then(translatedType => {
                        console.log("Тип занятия:", translatedType.text);

                        print(activity);
                    })
                } else {
                    print(activity);
                }
            })
        })
}

main()
    .catch((error) => console.log(error))