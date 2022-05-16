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
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

export default function SearchBarComp({ route }) {
  const navigation = useNavigation();
  const propsFromCreateExercise = route.params;
  const [currentList, setCurrentList] = useState([]);
  const [currentWord, setCurrentWord] = useState("");

  useEffect(() => {
    setCurrentList(propsFromCreateExercise.exerciseList);
    setCurrentWord(propsFromCreateExercise.exerciseName);
    function reset() {
      setCurrentWord("");
      setCurrentList([]);
    }
    return reset;
  }, []);
  //make a use effect for everytime the list loads

  function handleSubmit() {
    console.log(currentWord, "search-result");
    const propsFromSearch = {
      fromSearch: true,
      exerciseName: currentWord,
      sets: propsFromCreateExercise.sets,
      reps: propsFromCreateExercise.reps,
      duration: propsFromCreateExercise.duration,
    };
    navigation.navigate("CreateEditExercise", propsFromSearch);
  }
  console.log(propsFromCreateExercise);
  return (
    <TouchableWithoutFeedback
      bg="colors.bg"
      height="100%"
      onPress={Keyboard.dismiss}
    >
      <VStack
        space={5}
        bg="colors.bg"
        w="100%"
        height="100%"
        maxW="400px"
        divider={
          <Box px="2">
            <Divider />
          </Box>
        }
      >
        <VStack w="100%" space={5} my="10" alignSelf="center">
          <HStack>
            <Heading fontSize="lg" color="white" w="50%">
              Exercise Name
            </Heading>
            <Button w="50%" onPress={handleSubmit}>
              Submit
            </Button>
          </HStack>
          <Input
            placeholder="Find exercise by name"
            width="99%"
            borderRadius="4"
            py="3"
            px="1"
            fontSize="14"
            color="white"
            value={currentWord}
            onChangeText={(text) => setCurrentWord(text)}
            InputLeftElement={
              <Icon
                m="2"
                ml="3"
                size="6"
                color="gray.400"
                as={<MaterialIcons name="search" />}
              />
            }
            InputRightElement={
              <Icon
                m="2"
                ml="3"
                size="6"
                color="gray.400"
                onPress={() => {
                  Keyboard.dismiss;
                }}
                as={<MaterialIcons name="close" />}
              />
            }
          />
        </VStack>
      </VStack>
    </TouchableWithoutFeedback>
  );
}
