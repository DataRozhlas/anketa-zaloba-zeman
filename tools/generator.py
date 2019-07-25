#%%
import pandas as pd
import json

#%%
d = pd.read_csv('./data/data.csv')

#%%
d = d[['j', 'p', 's', 'o', 'o1', 'f']]

d.f = d.f.apply(lambda x: x.split('/')[-1])

d.fillna('', inplace=True)

#%%
with open('./data/data.json', 'w', encoding='utf-8') as f:
    f.write(json.dumps(list(d.to_dict(orient='index').values()),  ensure_ascii=False))