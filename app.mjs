import express from "express";


const app = express()


const dailyTasks = {
  1: 'wakeup',
  2: 'brush',
  3: 'bath',
  4: 'Breakfast'
};

const doOneByOne = async (m) => {
  dailyTasks[1] = dailyTasks[1].toUpperCase();
  await new Promise((resolve) => setTimeout(resolve, m)); // Simulating a delay with setTimeout
  dailyTasks[2] = dailyTasks[2].toLowerCase();
  await new Promise((resolve) => setTimeout(resolve, m)); // Simulating a delay with setTimeout
  dailyTasks[3] = dailyTasks[3].toLocaleLowerCase();
  dailyTasks[4] = dailyTasks[4].concat(`
  All done get the fuck up and go to school mf cyu there
  `)
  console.log('All done:', dailyTasks);
};

doOneByOne(5000).catch(err => console.error(err)); // Pass the delay time in milliseconds (e.g., 2000ms)



app.get('/',(req,res)=>{
    const Jsontype = JSON.stringify(dailyTasks)
    res.status(200).send(`Welcome to express-api, ${Jsontype}`)
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




/**type TaskKeys = '1' | '2' | '3' | '4'; // Defining the keys as string literals

interface DailyTasks {
  [key in TaskKeys]: string;
}

const dailyTasks: DailyTasks = {
  '1': 'wakeup',
  '2': 'brush',
  '3': 'bath',
  '4': 'Breakfast'
};

const delay = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

const transformTasks = async (): Promise<void> => {
  const modifiedTasks: DailyTasks = {
    ...dailyTasks,
    '1': dailyTasks['1'].toUpperCase(),
    '2': dailyTasks['2'].toLowerCase(),
    '3': dailyTasks['3'].toLocaleLowerCase(),
    '4': `${dailyTasks['4']} finally go to school`
  };

  console.log('All done:', modifiedTasks);
};

const doOneByOne = async (delayTime: number): Promise<void> => {
  await delay(delayTime);
  await transformTasks();
};

doOneByOne(1000).catch((err: Error) => console.error(err));
 */