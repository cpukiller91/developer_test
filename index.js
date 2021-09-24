"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = require("node-fetch");
const chalk = require("chalk");
const translate = require("@vitalets/google-translate-api");
// https://www.boredapi.com/documentation
let bored_api_url = "https://www.boredapi.com/api/activity";
let friends_count = 1;
friends_count++;
let PRICE_LIMIT = 0.5;
let countActivity = 4;
bored_api_url += "?maxprice=" + PRICE_LIMIT + "&maxparticipants=" + friends_count;
function fetchActivity() {
    return __awaiter(this, void 0, void 0, function* () {
        var res = yield node_fetch_1.default(bored_api_url);
        return res.json();
    });
}
function translateString(value) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield translate(value, {
            to: "ru"
        });
    });
}
function analyzeActivity(activity) {
    if (activity.price > PRICE_LIMIT) {
        console.warn(chalk.red("Занятие не подходит по стоимости"));
    }
    else {
        console.log(chalk.green("Занятие подходит по стоимости"));
    }
    if (activity.participants > friends_count) {
        console.warn(chalk.red("В компании не хватит людей для занятия"));
    }
    else {
        console.warn(chalk.green("В компании достаточно людей для занятия"));
    }
}
function print(activity) {
    console.log("Уровень финансовых затрат(от 0 до 1): " + activity.price);
    console.log("Требуемое число людей: " + activity.participants);
    analyzeActivity(activity);
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
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
                    });
                }
                else {
                    print(activity);
                }
            });
        });
    });
}
for (var i = 0; i < countActivity; i++) {
    main().catch((error) => console.log(error));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLDJDQUErQjtBQUMvQiwrQkFBK0I7QUFDL0IsNERBQTREO0FBRzVELHlDQUF5QztBQUN6QyxJQUFJLGFBQWEsR0FBRyx1Q0FBdUMsQ0FBQztBQUM1RCxJQUFJLGFBQWEsR0FBRyxDQUFDLENBQUM7QUFDdEIsYUFBYSxFQUFFLENBQUM7QUFFaEIsSUFBSSxXQUFXLEdBQUcsR0FBRyxDQUFDO0FBQ3RCLElBQUksYUFBYSxHQUFHLENBQUMsQ0FBQztBQUN0QixhQUFhLElBQUksWUFBWSxHQUFDLFdBQVcsR0FBQyxtQkFBbUIsR0FBQyxhQUFhLENBQUM7QUFFNUUsU0FBZSxhQUFhOztRQUN4QixJQUFJLEdBQUcsR0FBRyxNQUFNLG9CQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDckMsT0FBTyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDdEIsQ0FBQztDQUFBO0FBRUQsU0FBZSxlQUFlLENBQUMsS0FBYTs7UUFDeEMsT0FBTyxNQUFNLFNBQVMsQ0FBQyxLQUFLLEVBQUU7WUFDMUIsRUFBRSxFQUFFLElBQUk7U0FDWCxDQUFDLENBQUM7SUFDUCxDQUFDO0NBQUE7QUFFRCxTQUFTLGVBQWUsQ0FBQyxRQUFrQjtJQUN2QyxJQUFJLFFBQVEsQ0FBQyxLQUFLLEdBQUcsV0FBVyxFQUFFO1FBQzlCLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDLENBQUM7S0FDL0Q7U0FBTTtRQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQywrQkFBK0IsQ0FBQyxDQUFDLENBQUM7S0FDN0Q7SUFFRCxJQUFJLFFBQVEsQ0FBQyxZQUFZLEdBQUcsYUFBYSxFQUFFO1FBQ3ZDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDLENBQUM7S0FDckU7U0FBTTtRQUNILE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDLENBQUM7S0FDeEU7QUFDTCxDQUFDO0FBRUQsU0FBUyxLQUFLLENBQUMsUUFBa0I7SUFDN0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3Q0FBd0MsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdkUsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsR0FBRyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUM7SUFFL0QsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzlCLENBQUM7QUFFRCxTQUFlLElBQUk7O1FBRVgsYUFBYSxFQUFFO2FBQ1YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ2Qsd0JBQXdCO1lBRXZCLGVBQWUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEVBQUU7Z0JBQ3pELE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUVqRCxpQ0FBaUM7Z0JBQ2pDLElBQUksUUFBUSxDQUFDLElBQUksRUFBRTtvQkFDZixlQUFlLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRTt3QkFDakQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUVqRCxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQ3BCLENBQUMsQ0FBQyxDQUFBO2lCQUNMO3FCQUFNO29CQUNILEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztpQkFDbkI7WUFDTCxDQUFDLENBQUMsQ0FBQTtRQUNOLENBQUMsQ0FBQyxDQUFBO0lBQ2QsQ0FBQztDQUFBO0FBRUQsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFDLGFBQWEsRUFBRSxDQUFDLEVBQUUsRUFBQztJQUNoQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQTtDQUM5QyJ9