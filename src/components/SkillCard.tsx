import React from "react";
import {TouchableOpacity, Text, StyleSheet, TouchableOpacityProps} from 'react-native'

interface ISkillCaraProps extends TouchableOpacityProps {
    Nome: string,
    Email: string,
    Telefone: string,

}

export function SkillCard({Nome, Email, Telefone, ...rest}: ISkillCaraProps){
    return (
        <TouchableOpacity 
            style={styles.buttonSkill} 
            {...rest} 
        >
           <Text style={styles.textSkillNome}>
            {Nome}
            </Text>
            <Text style={styles.textSkillemail}>
            {Email}
            </Text>
            <Text style={styles.textSkillTelefone}>
            {Telefone}
           </Text>
       </TouchableOpacity>       
    )
}
const styles = StyleSheet.create({
    buttonSkill: {
        backgroundColor: '#1f1e25',
        padding:15,
        borderRadius:15,
        alignItems: 'center',
        marginBottom: 15,
    },
    textSkillNome: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },
    textSkillemail: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold'
    },
    textSkillTelefone: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold'
    }
})