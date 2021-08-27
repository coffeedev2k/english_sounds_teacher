import pygame, re, sys, time, random, configparser, os.path, pickle
#===============================================contents of config.ini file
#размер холста
MAX_X = 1920
MAX_Y = 1080



#группы звуков для обучения
group1 = 'show_bed_boy'
group2 = 'good_shoot_cure'
group3 = 'pea_boat_car_tea_dog'
group4 = 'cheese_june_fly_video_this_think'
group5 = 'see_television_zoo_shall_hat_man'
group6 = 'now_singer_love_red_wet_yes'
group7 = 'here_cure_hair'
group8 = 'wait_boy_cow'
group9 = 'here_wait_cure_boy_show_hair_my_cow'
group10 = 'sheep_ship_good_shoot_here_wait'
group11 = 'bed_teacher_bird_door_cure_boy_show'
group12 = 'cat_up_far_on_hair_my_cow'
#все возможные звуки здесь
allsound = 'bed_bird_boat_boy_car_cat_cheese_cow_cure_dog_door_far_fly_go_good_hair_hat_here_june_love_man_my_now_on_pea_red_see_shall_sheep_ship_shoot_show_singer_tea_teacher_television_think_this_up_video_wait_wet_yes_zoo_'


#количество звуков за раз на старте(должно быть не более, чем количество звуков в группе и не больше максимального)
number_of_sounds = 1
#количество звуков подряд максимальное
number_of_sounds_threshold = 3
#количество звуков подряд, которое нужно угадать до перехода на новую группу
count_of_success_threshold = 10



#==============================================================================================
mp3_dirs = ['mp3_sounds_chart', 'mp3_sounds_alex', 'mp3_sounds_f1', 'mp3_sounds_f2']
if os.path.isfile("config.ini"):
    try:
        from configparser import ConfigParser
    except ImportError:
        from ConfigParser import ConfigParser  # ver. < 3.0

    # instantiate
    config = ConfigParser()

    # parse existing file
    config.read('config.ini')
    # read values from a section
    MAX_X = config.getint('default', 'MAX_X')
    MAX_Y = config.getint('default', 'MAX_Y')
    number_of_sounds = config.getint('default', 'number_of_sounds')


    group1 = config.get('default', 'group1')
    group2 = config.get('default', 'group2')
    group3 = config.get('default', 'group3')
    group4 = config.get('default', 'group4')
    group5 = config.get('default', 'group5')
    group6 = config.get('default', 'group6')
    group7 = config.get('default', 'group7')
    group8 = config.get('default', 'group8')
    group9 = config.get('default', 'group9')
    group10 = config.get('default', 'group10')
    group11 = config.get('default', 'group11')
    group12 = config.get('default', 'group12')

    number_of_sounds_threshold = config.getint('default', 'number_of_sounds_threshold')
    count_of_success_threshold = config.getint('default', 'count_of_success_threshold')

    all = [group1, group2, group3, group4, group5, group6, group7, group8, group9, group10, group11, group12]

    dir1 = config.get('default', 'dir1')
    dir2 = config.get('default', 'dir2')
    dir3 = config.get('default', 'dir3')
    dir4 = config.get('default', 'dir4')
    mp3_dirs = [dir1, dir2, dir3, dir4]


if os.path.isfile("progress.ini"):
    with open('progress.ini', 'rb') as fp:
        all = pickle.load(fp)
print(all)

mismatch = 0
match = 1
count_of_success = 0
sounds = []
xx_magic = []
yy_magic = []

bg_color = (100, 100, 100)
pygame.init()
screen = pygame.display.set_mode((MAX_X, MAX_Y))
pygame.font.init()  # you have to call this at the start,# if you want to use this module.
myfont = pygame.font.SysFont('Helvetica', 40)


def show_img(sounds):
    xx = []
    yy = []
    tmp_mass = textlist.copy()
    tmp_mass = list(set(tmp_mass) - set(sounds))
    for i in range(0, len(tmp_mass)):
        x = random.randint(0, MAX_X-120)
        y = random.randint(0, MAX_Y-120)
        rand = random.choice(tmp_mass)
        tmp_mass.remove(rand)
        print(rand)
        img = pygame.image.load("png.pictures.chart/" + rand + ".png")
        screen.blit(img, (x, y))
    for i in sounds:
        img_magic = pygame.image.load("png.pictures.chart/" + i + ".png")
        x = random.randint(0, MAX_X - 120)
        y = random.randint(0, MAX_Y - 120)
        xx.append(x)
        yy.append(y)
        screen.blit(img_magic, (x, y))

    return xx, yy

while True:
    if count_of_success > count_of_success_threshold:
        number_of_sounds = number_of_sounds + 1
        count_of_success = 0
    if number_of_sounds > number_of_sounds_threshold:
        del all[0]
        number_of_sounds = 1
    if len(all) == 0:
        exit()
    text = all[0]
    textlookfor = r"[a-z]+"
    textlist = re.findall(textlookfor, text)

    dir = random.choice(mp3_dirs)
    matchsurface23 = myfont.render(str(count_of_success) + "/"  + str(count_of_success_threshold), False, (100, 0, 0))
    #matchsurface = myfont.render(str(match/(match + mismatch)), False, (100, 100, 100))
    textlist1 = textlist[:]
    for i in range(0, number_of_sounds):
        sound = random.choice(textlist1)
        textlist1.remove(sound)
        sounds.append(sound)
    print(sounds)
    next_sound = False
    wait = 81
    screen.fill(bg_color)
    #bgimg = pygame.image.load("jpg.articulation.gimp/" + sound + ".jpg")
    #screen.blit(bgimg, (0, 0))
    #screen.blit(matchsurface, (0, 0))
    screen.blit(matchsurface23, (0, 0))
    xx_magic, yy_magic = show_img(sounds)
    pygame.display.flip()
    while (next_sound == False):
        time.sleep(0.1)
        wait = wait + 1
        if wait > 50:
            for i_sound in sounds:
                print("wait is")
                print(wait)
                print("i_sound is")
                print(i_sound)
                #pygame.mixer.music.load(mp3_dirs[3] + "/" + i_sound + ".mp3")
                pygame.mixer.music.load(dir + "/" + i_sound + ".mp3")
                #soundlevel = random.uniform(0.1, 1.0)
                #pygame.mixer.music.set_volume(soundlevel)
                #print(soundlevel)
                pygame.mixer.music.play()
                #pygame.event.wait()
                time.sleep(0.5)
                print("sounds are")
                print(sounds)
            wait = 0
        for event in pygame.event.get():
            if (event.type == pygame.KEYDOWN):
                if (event.key == pygame.K_ESCAPE):
                    with open('progress.ini', 'wb') as fp:
                        pickle.dump(all, fp)
                    sys.exit()
            if (event.type == pygame.MOUSEBUTTONDOWN):
                Mouse_x, Mouse_y = pygame.mouse.get_pos()
                if (Mouse_x > xx_magic[0] and Mouse_x < xx_magic[0] + 120 and Mouse_y > yy_magic[0] and Mouse_y < yy_magic[0] + 120):
                    count_of_success = count_of_success + 1
                    match = match + 1
                    print(sounds)
                    print("you are right!")
                    # pygame.mixer.music.load("mp3.words.chart/" + sounds[0] + ".mp3")
                    # pygame.mixer.music.play()
                    #pygame.mixer.music.load("mp3.sounds.chart/" + sound + ".mp3")
                    #pygame.mixer.music.play()
                    #time.sleep(0.1)
                    pygame.mixer.music.load("mp3.words.chart/yes.mp3")
                    pygame.mixer.music.play()
                    time.sleep(0.4)
                    #pygame.mixer.music.load("wav.words.robot/" + sound + ".wav")
                    #pygame.mixer.music.play()
                    #time.sleep(1)
                    sounds.remove(sounds[0])
                    xx_magic.remove(xx_magic[0])
                    yy_magic.remove(yy_magic[0])
                    if len(sounds) == 0:
                        next_sound = True
                else:
                    mismatch = mismatch + 1
                    count_of_success = 0