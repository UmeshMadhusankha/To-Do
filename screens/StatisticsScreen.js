import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import PieChart from 'react-native-pie-chart';
import { useSelector } from 'react-redux';

const StatisticsScreen = () => {

  // variables for pie chart
  const widthAndHeight = 240;
  const sliceColor = ['rgba(0, 255, 255, 0.5)', 'rgba(0, 255, 0, 0.5)','rgba(255, 0, 0, 0.5)','gray']

  const tasks = useSelector((state) => state.tasks);

  const today = new Date().toDateString();

// today success rate calculating

  const todayTasks = tasks.filter((task) => task.value.date == today);
  
  let totalTodayTasks = 0;
  let completedTodayTasks = 0;
  let onGoingTodayTasks = 0;
  let failedTodayTasks = 0;
  let fallbackValue1 = 0;

  todayTasks.forEach(element => {
    totalTodayTasks++;
    if (element.value.status == 1) {
      onGoingTodayTasks++;
    }
    else if (element.value.status == 2) {
      completedTodayTasks++;
    }
    else {
      failedTodayTasks++;
    }
  });

  fallbackValue1 = totalTodayTasks == 0 ? 1 : 0;
  
  let series1 = [completedTodayTasks, onGoingTodayTasks, failedTodayTasks, fallbackValue1];

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
  let onGoingWeekTasks = 0;
  let failedWeekTasks = 0;
  let fallbackValue2 = 0;

  prevWeekTasks.forEach((element) => {
    totalWeekTasks++;
    if (element.value.status == 1) {
      onGoingWeekTasks++;
    }
    else if (element.value.status == 2) {
      completedWeekTasks++;
    }
    else {
      failedWeekTasks++;
    }
  })

  fallbackValue2 = totalWeekTasks == 0 ? 1 : 0;

  let series2 = [completedWeekTasks,onGoingWeekTasks,failedWeekTasks,fallbackValue2];

// calculating long term works' success rate
  const longTermTasks = useSelector((state) => state.longTermTasks);

  let totalLongTermTasks = 0;
  let completedLongTermTasks = 0;
  let onGoingLongTermTasks = 0;
  let failedLongTermTasks = 0;
  let fallbackValue3 = 0;

  longTermTasks.forEach((element) => {
    totalLongTermTasks++;
    if (element.value.status == 1) {
      onGoingLongTermTasks++;
    }
    else if (element.value.status == 2) {
      completedLongTermTasks++;
    }
    else {
      failedLongTermTasks++;
    }
  })

  fallbackValue3 = totalLongTermTasks == 0 ? 1 : 0;

  let series3 = [completedLongTermTasks,onGoingLongTermTasks,failedLongTermTasks,fallbackValue3];


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
            <Text style={styles.stat_text1}>{totalTodayTasks == 0 ? 0 : Math.trunc((completedTodayTasks/totalTodayTasks) * 100)}</Text>
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
            <Text style={styles.stat_text1}>{totalWeekTasks == 0 ? 0 : Math.trunc((completedWeekTasks/totalWeekTasks) * 100)}</Text>
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
            <Text style={styles.stat_text1}>{totalLongTermTasks == 0 ? 0 : Math.trunc((completedLongTermTasks/totalLongTermTasks) * 100)}</Text>
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
    fontSize: 21,
    fontWeight: 500,
    padding: 10
  },
  pie1: {
    margin: 10
  },
  stat1: {
    backgroundColor: '#eee',
    width: '180',
    height: '180',
    position: 'absolute',
    top: 100,
    justifyContent: 'center',
    borderRadius: 100,
  },
  stat_text1: {
    textAlign: 'center',
    fontSize: 50,
    fontWeight: 800,
    color: '#02ba39'
  },
  stat_text2: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 500,
    color: '#02ba39'
  }
}