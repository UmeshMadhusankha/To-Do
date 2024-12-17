import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import PieChart from 'react-native-pie-chart';
import { useSelector } from 'react-redux';

const StatisticsScreen = () => {

  // variables for pie chart
  const widthAndHeight = 250;
  const sliceColor = ['rgba(0,255,0,0.8)', 'rgba(255,0,0,0.2)']

  const tasks = useSelector((state) => state.tasks);

  const today = new Date().toDateString();

// today success rate calculating

  const todayTasks = tasks.filter((task) => task.value.date == today);
  
  let totalTodayTasks = 0;
  let completedTodayTasks = 0;

  todayTasks.forEach(element => {
    totalTodayTasks++;
    if (element.value.status == 2) {
      completedTodayTasks++;
    }
  });

  let series1 = [completedTodayTasks/totalTodayTasks, 1 - (completedTodayTasks/totalTodayTasks)];

// calculating weeks' success rate
  const previousWeek = [];

  for(let i = 0; i < 7; i++) {
    let date = new Date();
    date.setDate(date.getDate() - i);
    previousWeek.push(date.toDateString())
  }

  // console.log(previousWeek)
  let prevWeekTasks = [];
  previousWeek.forEach(day => {
    let currDate = day;
    const currDayTasks = tasks.filter((task) => task.value.date == currDate);
    prevWeekTasks.push(...currDayTasks);
  })

  let totalWeekTasks = 0;
  let completedWeekTasks = 0;

  prevWeekTasks.forEach((element) => {
    totalWeekTasks++;
    if (element.value.status == 2) {
      completedWeekTasks++;
    }
  })

  let series2 = [(completedWeekTasks/totalWeekTasks), 1 - (completedWeekTasks/totalWeekTasks)];

// calculating long term works' success rate
  const longTermTasks = useSelector((state) => state.longTermTasks);

  let totalLongTermTasks = 0;
  let completedLongTermTasks = 0;

  longTermTasks.forEach((element) => {
    totalLongTermTasks++;
    if (element.value.status == 2) {
      completedLongTermTasks++;
    }
  })

  let series3 = [(completedLongTermTasks/totalLongTermTasks), 1 - (completedLongTermTasks/totalLongTermTasks)];


  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.pie_container1}>
          <Text style={styles.pie_topics}>Success Rate of Today</Text>
          <PieChart 
            widthAndHeight={widthAndHeight}
            series={series1}
            sliceColor={sliceColor}
            coverRadius={0.7}
            style={styles.pie1}
          />
          <View style={styles.stat1}>
            <Text style={styles.stat_text1}>{(completedTodayTasks/totalTodayTasks) * 100}</Text>
            <Text style={styles.stat_text2}>percent</Text>
          </View>
        </View>

        <View style={styles.pie_container1}>
          <Text style={styles.pie_topics}>Previous Weeks' Success Rate</Text>
          <PieChart 
            widthAndHeight={widthAndHeight}
            series={series2}
            sliceColor={sliceColor}
            coverRadius={0.7}
            style={styles.pie1}
          />
          <View style={styles.stat1}>
            <Text style={styles.stat_text1}>{(completedWeekTasks/totalWeekTasks) * 100}</Text>
            <Text style={styles.stat_text2}>percent</Text>
          </View>
        </View>

        <View style={styles.pie_container1}>
          <Text style={styles.pie_topics}>Success Rate of Long Term Tasks</Text>
          <PieChart 
            widthAndHeight={widthAndHeight}
            series={series3}
            sliceColor={sliceColor}
            coverRadius={0.7}
            style={styles.pie1}
          />
          <View style={styles.stat1}>
            <Text style={styles.stat_text1}>{(completedLongTermTasks/totalLongTermTasks) * 100}</Text>
            <Text style={styles.stat_text2}>percent</Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default StatisticsScreen

const styles = {
  pie_container1 : {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    position: 'relative',
    borderBottomWidth: 2
  },
  pie_topics: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 500,
    padding: 10
  },
  pie1: {
    margin: 10
  },
  stat1: {
    backgroundColor: '#ddd',
    width: '185',
    height: '185',
    position: 'absolute',
    top: 100,
    justifyContent: 'center',
    borderRadius: 100,
  },
  stat_text1: {
    textAlign: 'center',
    fontSize: 50,
    fontWeight: 800,
    color: 'green'
  },
  stat_text2: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 500,
    color: 'green'
  }
}