import { Text, View, TextInput, TouchableOpacity, FlatList, Alert } from "react-native";
import { styles } from "./styles";
import { Participant } from "../../components/Participant";
import { useEffect, useState } from "react";

export const Home = () => {
    const [participant, setParticipant] = useState<string>('');
    const [participantList, setParticipantList] = useState<string[]>([]);

    const handleParticipantAdd = (name : string) => {
        if(participantList.includes(name)) {
            return Alert.alert("Participante existe", "Já existe um participante com o mesmo nome na lista")
        } else {
            Alert.alert('Participante adicionado ' ,`Você adicionou o participante ${name}`);
            setParticipantList(prevState => [...prevState, name])
        };
    };

    // useEffect(() => {

    // }, [participantList])

    const handleParticipantRemove = (name: string) => {
        Alert.alert("Remover", `Remover o participante ${name}`, [
            {
                text: 'Sim',
                onPress: () => Alert.alert('Deletado!')
            },
            {
                text: 'Não',
                style: 'cancel'
            }
        ])
        console.log(`Você removeu o participante ${name}`)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.eventName}>
                Nome do Evento
            </Text>

            <Text style={styles.eventDate}>
                Quarta, 13 de Março de 2024
            </Text>

            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Nome do participante"
                    placeholderTextColor="#6B6B6B"
                    onChangeText={e => setParticipant(e)}
                />

                <TouchableOpacity style={styles.button} onPress={() => handleParticipantAdd(participant)}>
                    <Text style={styles.buttonText}>
                        +
                    </Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={participantList}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <Participant
                        key={item}
                        name={item}
                        onRemove={(() => handleParticipantRemove(item))}
                    />
                )}
                showsHorizontalScrollIndicator={false}
                ListEmptyComponent={() => (
                    <Text style={styles.listEmptyText}>
                        Ninguém chegou no evento ainda? Adicione participantes a sua lista de presença.
                    </Text>
                )}
            />

        </View>
    );
};

