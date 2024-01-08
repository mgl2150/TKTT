import json

def create_inverse_index(json_data):
    inverse_index = {}
    for key, value in json_data.items():
        if isinstance(value, str):  
            words = value.split()
            for word in words:
                if word not in inverse_index:
                    inverse_index[word] = [key]
                else:
                    inverse_index[word].append(key)
        elif isinstance(value, list):  
            for item in value:
                words = item.split() if isinstance(item, str) else str(item).split()
                for word in words:
                    if word not in inverse_index:
                        inverse_index[word] = [key]
                    else:
                        inverse_index[word].append(key)
    return inverse_index

with open('test.json', 'r') as file:
    json_data = json.load(file)

inverse_index = create_inverse_index(json_data)

for word, indices in inverse_index.items():
    print(f'{word}: {indices}')

