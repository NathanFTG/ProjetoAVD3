import React, { useState,useEffect} from 'react'
import { View, Text, StyleSheet, TextInput, Platform, TouchableOpacity, ScrollView, FlatList,Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import  { Button }  from '../components/Button'
import { SkillCard } from '../components/SkillCard'
interface Cadastro{
    id: string,
    name: string,
    email: string,
    telefone: string
}


export function Home() {
    const [newNomes, setNewNomes] = useState('')
    const [myNomes, setMyNomes] = useState<Cadastro[]>([])
    const [newEmails, setNewEmails] = useState('')
    const [myEmails, setMyEmails] = useState<Cadastro[]>([])
    const [newTelefones, setNewTelefones] = useState('')
    const [myTelefones, setMyTelefones] = useState<Cadastro[]>([])
    const [greeting, setGreeting] = useState('')

    function handleAddNew(){
        const Dati = {
            id: String(new Date().getTime()),
            name: newNomes,
            email: newEmails,
            telefone: newTelefones,
        }
        setMyNomes([...myNomes,Dati])
        setNewNomes('')
        setMyEmails([...myEmails,Dati])
        setNewEmails('')
        setMyTelefones([...myTelefones,Dati])
        setNewTelefones('')
    }

    function handleRemove(id: string){
        setMyNomes(myNomes.filter(Cadastro=> Cadastro.id !== id))

    }

    useEffect(() => {
        const currentHour = new Date().getHours();
        if (currentHour >=5 && currentHour < 12){
            setGreeting('Bom dia')
        }else if (currentHour >= 12 && currentHour < 18) {
            setGreeting('Boa Tarde')
        } else {
            setGreeting('Boa Noite')
        }
    }, [])

    useEffect(() => {
        async function loadData() {
            const storagedSkills = await AsyncStorage.getItem('@myNomes: Nomes')
            if(storagedSkills){
                setMyNomes(JSON.parse(storagedSkills))
            }
        }
        loadData()
    }, [])
    
    useEffect(() => {
        async function removeAll() {
            await AsyncStorage.removeItem('@myNomes: Nomes')
        }
        removeAll()
    }, [])    

    useEffect (() =>{
        async function saveData(){
            await AsyncStorage.setItem('@myNomes', JSON.stringify(myNomes))
        }
        saveData()
    },[myNomes])

  return(
    <>
        <View style={styles.container}>
            <Image style={{width:200,height:50, backgroundColor: "red"}} source={require('../assets/Santander.jpg')}/>

            <Text style={styles.title}>Cadastre suas informações abaixo.</Text>
            <Text style={styles.greetings}>
                {greeting}
            </Text>
        
            <TextInput
            style={styles.input}
            placeholder= 'Nome'
            value={newNomes}
            placeholderTextColor='#555'
            onChangeText={value => setNewNomes(value)}
            />

            <TextInput
            style={styles.input}
            placeholder= 'Email'
            value={newEmails}
            placeholderTextColor='#555'
            onChangeText={value => setNewEmails(value)}
            />

            <TextInput
            style={styles.input}
            placeholder= 'Telefone'
            value={newTelefones}
            placeholderTextColor='#555'
            onChangeText={value => setNewTelefones(value)}
            />

            <Button 
            onPress={handleAddNew}
            title = 'Cadastrar'
            />

                       
            <Text style={[styles.title, {marginVertical:20}]}>
                Contas Cadastradas :
            </Text>
            
            <FlatList showsVerticalScrollIndicator={false}
            data={myNomes}
            keyExtractor={item=> item.id}
            renderItem={({item})=> ( 
                <SkillCard
                Nome={item.name}
                Email={item.email}
                Telefone={item.telefone}
                onPress={() => handleRemove(item.id)}
                />
            )}
            />
        </View>
    </>
  )
}

const styles= StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#e1cdcd',
        paddingHorizontal:30,
        paddingVertical: 70
    },
    title: {
        color:'#000000',
        fontSize:25,
        fontWeight: 'bold'
    },
    input:{
        backgroundColor:'#1f1e25',
        color: '#fff',
        fontSize: 18,
        padding: Platform.OS =='ios' ? 15 : 12,
        marginTop: 5,
        borderRadius: 30
    },
    greetings: {
        color: '#000000',
        fontSize:20,
    }, 
})