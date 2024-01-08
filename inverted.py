import json
from collections import defaultdict
import string

def create_inverse_index(json_data):
    inverse_index = defaultdict(list)
    for key, value in json_data.items():
        if isinstance(value, str):
            translator = str.maketrans('', '', string.punctuation)
            cleaned_text = value.translate(translator).lower()

            words = cleaned_text.split()

            for idx, word in enumerate(words):
                inverse_index[word].append((key, idx))

        elif isinstance(value, list):  # Check if the value is a list
            for idx, item in enumerate(value):
                if isinstance(item, str):
                    translator = str.maketrans('', '', string.punctuation)
                    cleaned_text = item.translate(translator).lower()

                    words = cleaned_text.split()

                    for word_idx, word in enumerate(words):
                        inverse_index[word].append((key, idx, word_idx))

    return inverse_index

with open('./test.json', 'r') as file:
    json_data = json.load(file)

inverse_index = create_inverse_index(json_data)

for word, indices in inverse_index.items():
    print(f'{word}: {indices}')
