import AsyncStorage from "@react-native-async-storage/async-storage";

const useStorage = () => {
  // Buscar os itens salvos
  const getItem = async (key: string) => {
    try {
      const passwords = await AsyncStorage.getItem(key);
      return JSON.parse(passwords) || [];
    } catch (error) {
      console.error("Erro ao buscar ", error);
      return [];
    }
  };

  // Salvar um item no storage
  const saveItem = async (key: string, value: any) => {
    try {
      let passwords = await getItem(key);

      passwords.push(value);

      await AsyncStorage.setItem(key, JSON.stringify(passwords));
    } catch (error) {
      console.error("Erro ao salvar ", error);
      return [];
    }
  };

  // Remover algo do storage
  const removeItem = async (key: string, item: string) => {
    try {
      let passwords = await getItem(key);

      let myPasswords = passwords.filter((password: string) => {
        return password !== item;
      });

      await AsyncStorage.setItem(key, JSON.stringify(myPasswords));

      return myPasswords;
    } catch (error) {
      console.error("Erro ao deletar ", error);
      return [];
    }
  };

  return {
    getItem,
    saveItem,
    removeItem,
  };
};

export default useStorage;
