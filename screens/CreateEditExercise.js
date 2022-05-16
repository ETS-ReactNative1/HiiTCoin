import {
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import List from "./List";
import {
  KeyboardAvoidingView,
  Input,
  Box,
  Icon,
  Button,
  Center,
  flex,
  Text,
  keyboardDismissHandlerManager,
  FormControl,
  ScrollView,
  VStack,
  Heading,
  Select,
  CheckIcon,
  HStack,
  Divider,
} from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { MaterialIcons } from "@expo/vector-icons";
import {
  auth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "../firebase";
import {
  getUser,
  getExercises,
  secondToMinutesAndSeconds,
} from "../misc/helperFunctions";
import { useNavigation } from "@react-navigation/core";
import SearchBarComp from "../helperComponents/SearchBarComp";
import FacadeSearchBarComp from "../helperComponents/FacadeSearchBar";

export default function CreateEditExercise({ route }) {
  const [exerciseList, setExerciseList] = useState([]);
  const [exerciseName, setExerciseName] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [duration, setDuration] = useState({ minutes: "", seconds: "" });
  const [rest, setRest] = useState({ minutes: "", seconds: "" });
  const navigation = useNavigation();

  useEffect(() => {
    if (route.params.exerciseName) {
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
      setExerciseName(route.params.exerciseName);
    }
  }, [route.params.exerciseName]);

  let optionsArr = [];
  for (let i = 1; i <= 100; ++i) {
    optionsArr.push(i);
  }
  useEffect(() => {
    const getExer = async () => {
      const exerciseListFromDb = await getExercises();
      setExerciseList(exerciseListFromDb);
    };
    let workout = route.params.state;
    if (route.params.index) {
      //find exercise with flag on it
      const exDuration = secondToMinutesAndSeconds(exercise.duration);
      let exercise = workout.exercises[route.params.index];
      setExerciseName(exercise.name);
      setReps(exercise.reps);
      setSets(exercise.sets);
      setRest(exercise.rest);
      setDuration(exDuration);
      console.log({
        exerciseName,
        reps,
        duration,
        rest,
        sets,
      });
    }
    console.log("this cant be real");
    function reset() {
      setExerciseName("");
      setDuration({ minutes: "", seconds: "" });
      setSets("");
      setRest({ minutes: "", seconds: "" });
      setReps("");
    }
    getExer();

    return reset;
  }, []);

  function handleSearchPress() {
    const propsToSend = {
      exerciseName,
      exerciseList,
      reps,
      sets,
      duration,
      rest,
    };
    navigation.navigate("SearchBarComp", propsToSend);
  }
  return (
    <TouchableWithoutFeedback
      bg="colors.bg"
      height="150%"
      onPress={Keyboard.dismiss}
    >
      <KeyboardAwareScrollView style={{ backgroundColor: "#1B1B3A" }}>
        <Box marginTop="5%" alignSelf="center">
          <Text fontSize="3xl" color="colors.text">
            Create/Edit Exercise
          </Text>
        </Box>
        <VStack
          my="4"
          space={5}
          w="100%"
          maxW="300px"
          divider={
            <Box px="2">
              <Divider />
            </Box>
          }
        >
          <VStack w="100%" space={5} alignSelf="center">
            <Heading fontSize="lg" color="white">
              Exercise Name:
              {exerciseName}
            </Heading>
            <Button
              onPress={handleSearchPress}
              startIcon={
                <Icon pl={0} as={MaterialIcons} name="search" size={5} />
              }
            >
              <Text>Change Exercise Name</Text>
            </Button>
          </VStack>
        </VStack>
        <Center alignContent="center">
          <Box w="3/4" maxWidth="300px" width="100%">
            <FormControl.Label
              marginBottom="0%"
              _text={{
                bold: true,
                ml: 2,
                color: "colors.text",
              }}
            >
              Sets
            </FormControl.Label>
            <Select
              minWidth="200"
              _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size="5" />,
              }}
              placeholder={String(sets)}
              selectedValue={String(sets)}
              value={String(sets)}
              mt={1}
              onValueChange={(num) => {
                setSets(String(num));
              }}
            >
              {optionsArr.map((num) => (
                <Select.Item key={num} label={num} value={String(num)} />
              ))}
            </Select>
          </Box>
        </Center>
        <Center alignContent="center">
          <Box w="3/4" maxWidth="300px" width="100%">
            <FormControl.Label
              marginBottom="0%"
              _text={{
                bold: true,
                ml: 2,
                color: "colors.text",
              }}
            >
              Reps
            </FormControl.Label>
            <Select
              minWidth="200"
              _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size="5" />,
              }}
              placeholder={String(reps)}
              selectedValue={String(reps)}
              value={String(reps)}
              mt={1}
              onValueChange={(num) => {
                setReps(String(num));
              }}
            >
              {optionsArr.map((num) => (
                <Select.Item key={num} label={num} value={String(num)} />
              ))}
            </Select>
          </Box>
        </Center>
        <Text bold="true" color="colors.text" ml="25%" marginTop={4}>
          Duration
        </Text>
        <HStack width="40%" space={2} marginTop="3">
          <FormControl>
            <Input
              mx="1"
              placeholder="Minutes"
              w="100%"
              variant="rounded"
              margin="2"
              color="colors.other"
              value={String(duration.minutes)}
              keyboardType="numeric"
              onChangeText={(mins) => {
                setDuration({
                  minutes: String(mins),
                  seconds: duration.seconds,
                });
              }}
            />
          </FormControl>
          <FormControl>
            <Input
              mx="1"
              placeholder="Seconds"
              w="100%"
              variant="rounded"
              margin="2"
              color="colors.other"
              value={String(duration.seconds)}
              keyboardType="numeric"
              onChangeText={(secs) => {
                setDuration({
                  minutes: duration.minutes,
                  seconds: String(secs),
                });
              }}
            />
          </FormControl>
        </HStack>
        <Text bold="true" color="colors.text" ml="25%" marginTop={4}>
          Rest Between Sets
        </Text>
        <HStack width="40%" space={2} marginTop="3">
          <FormControl>
            <Input
              mx="1"
              placeholder="Minutes"
              w="100%"
              variant="rounded"
              margin="2"
              color="colors.other"
              value={String(rest.minutes)}
              keyboardType="numeric"
              onChangeText={(mins) => {
                setRest({
                  minutes: String(mins),
                  seconds: rest.seconds,
                });
              }}
            />
          </FormControl>
          <FormControl>
            <Input
              mx="1"
              placeholder="Seconds"
              w="100%"
              variant="rounded"
              margin="2"
              color="colors.other"
              value={String(rest.seconds)}
              keyboardType="numeric"
              onChangeText={(secs) => {
                setRest({
                  minutes: rest.minutes,
                  seconds: String(secs),
                });
              }}
            />
          </FormControl>
        </HStack>
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
}
