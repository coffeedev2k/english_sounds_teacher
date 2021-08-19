import pygame
import re
import sys
import time
import random

MAX_X = 1920
MAX_Y = 1080
number_of_sounds = 1
mismatch = 0
match = 1
count_of_success = 0
sounds = []
xx_magic = []
yy_magic = []
text = 'show_bed_boy'
u = 'good_shoot_cure'
p = 'pea_boat_car_tea_dog'
j = 'cheese_june_fly_video_this_think'
s = 'see_television_zoo_shall_hat_man'
n = 'now_singer_love_red_wet_yes'
consonants = ''
monophthongs = ''
diphthongs = 'here_wait_cure_boy_show_hair_my_cow'
group1 = 'sheep_ship_good_shoot_here_wait'
group2 = 'bed_teacher_bird_door_cure_boy_show'
group3 = 'cat_up_far_on_hair_my_cow'
all = ['good_shoot_cure', 'pea_boat_tea_dog', 'cheese_june_fly_video_this', 'see_television_zoo_shall_hat', 'up_on_far_my_cow', 'now_singer_love_red_wet_yes', 'bed_teacher_bird_door_cure_boy_show']
allsound = 'bed_bird_boat_boy_car_cat_cheese_cow_cure_dog_door_far_fly_go_good_hair_hat_here_june_love_man_my_now_on_pea_red_see_shall_sheep_ship_shoot_show_singer_tea_teacher_television_think_this_up_video_wait_wet_yes_zoo_'

mp3_dirs = ["mp3_sounds_chart", "mp3_sounds_alex", "mp3_sounds_f1", "mp3_sounds_f2"]
bg_color = (100, 100, 100)

# MAX_X = 150*len(textlist)
# MAX_Y = MAX_X
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
    if count_of_success > 10:
        number_of_sounds = number_of_sounds + 1
        count_of_success = 0
    if number_of_sounds > 3:
        del all[0]
        number_of_sounds = 1
    if len(all) == 0:
        exit()
    text = all[0]
    textlookfor = r"[a-z]+"
    textlist = re.findall(textlookfor, text)

    dir = random.choice(mp3_dirs)
    matchsurface23 = myfont.render(str(count_of_success) + "/10", False, (100, 0, 0))
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