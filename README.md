1) Instalar python 3 desde la página oficial
2) Instalar pip
3) Instalar git
4) Creamos un virtual enviroment en la carpeta que queramos:
    python -m venv seminario_env
5) activamos el env:
    cd seminario_env
    en windows: Scripts\activate.bat
    en linux: source seminario_env/bin/activate
    Atentos acá con que aparezca "(activate)" en la consola
6) una vez cargado el env:
    git clone https://github.com/jcmontx/seminare_tpo.git
7) pip install -r seminare_tpo/requirements.txt
8) cd seminare_tpo
9) python3 manage.py runserver
10) Todo listo! les va a indicar que entren en localhost:5000/