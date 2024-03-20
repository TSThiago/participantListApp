import { Text, View, TextInput, TouchableOpacity, FlatList, Alert } from "react-native";
import { styles } from "./styles";
import { Participant } from "../../components/Participant";
import { useEffect, useState } from "react";

export const Home = () => {
    const [participant, setParticipant] = useState<string>('');
    const [participantList, setParticipantList] = useState<string[]>([]);

    const handleParticipantAdd = () => {
        if (participantList.includes(participant)) {
            return Alert.alert("Participante existe", "Já existe um participante com o mesmo nome na lista")
        } else {
            Alert.alert('Participante adicionado ', `Você adicionou o participante ${participant}`);
            setParticipantList(prevState => [...prevState, participant]);
            setParticipant('')
        };
    };

    const handleParticipantRemove = (name: string) => {
        Alert.alert("Remover", `Remover o participante ${name}`, [
            {
                text: 'Sim',
                onPress: () => {
                    setParticipantList(prevState => prevState.filter(participants => participants !== name))
                    Alert.alert('Deletado!')
                }
            },
            {
                text: 'Não',
                style: 'cancel'
            }
        ]);
    };

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
                    value={participant}
                />

                <TouchableOpacity style={styles.button} onPress={() => handleParticipantAdd()}>
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

