import pygame
import re
import sys
import time
import random

count = 0
MAX_X = 1920
MAX_Y = 1080
game_over = False
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
allsound = 'bed_bird_boat_boy_car_cat_cheese_cow_cure_dog_door_far_fly_go_good_hair_hat_here_june_love_man_my_now_on_pea_red_see_shall_sheep_ship_shoot_show_singer_tea_teacher_television_think_this_up_video_wait_wet_yes_zoo_'
text = group3
bg_color = (100, 100, 100)
pygame.init()
screen = pygame.display.set_mode((MAX_X, MAX_Y))
myimage = pygame.image.load("python.png").convert()
pygame.font.init()  # you have to call this at the start,
# if you want to use this module.
myfont = pygame.font.SysFont('Helvetica', 40)
# При этом создается новый объект, для которого можно вызвать метод render .
#textsurface = myfont.render(text, False, (0, 0, 0))
# Это создает новую поверхность с уже нарисованным на ней текстом. В конце вы можете просто блить текстовую поверхность на главном экране.
# =========================
textlookfor = r"[a-z]+"
textlist = re.findall(textlookfor, text)

def show_img(sound):
    tmp_mass = textlist.copy()
    tmp_mass.remove(sound)
    for i in range(0, 15):
        x = random.randint(0, MAX_X-120)
        y = random.randint(0, MAX_Y-120)
        rand = random.choice(tmp_mass)
        print(rand)
        img = pygame.image.load("png.pictures.chart/" + rand + ".png")
        screen.blit(img, (x, y))
    img_magic = pygame.image.load("png.pictures.chart/" + sound + ".png")
    x = random.randint(0, MAX_X - 120)
    y = random.randint(0, MAX_Y - 120)
    screen.blit(img_magic, (x, y))
    return x, y

#for sound in textlist:
while True:
    sound = random.choice(textlist)
    print(sound)
    next_sound = False
    wait = 0
    screen.fill(bg_color)
#    print(sound)

    x_magic, y_magic = show_img(sound)

    pygame.display.flip()
    while (next_sound == False):
        pygame.mixer.music.load("mp3.sounds.chart/" + sound + ".mp3")
        pygame.mixer.music.play()
        #    time.sleep(10)
        while (next_sound == False):
            time.sleep(0.1)

            ###add repeat
            wait = wait + 1
            if wait > 50:
                pygame.mixer.music.play()
                wait = 0
                ###
            for event in pygame.event.get():
                if (event.type == pygame.KEYDOWN):
                    if (event.key == pygame.K_ESCAPE):
                        sys.exit()
                if (event.type == pygame.MOUSEBUTTONDOWN):
                    Mouse_x, Mouse_y = pygame.mouse.get_pos()
                    if (Mouse_x > x_magic and Mouse_x < x_magic + 120 and Mouse_y > y_magic and Mouse_y < y_magic + 120):
                        next_sound = True
                        print("you are right!")
                        pygame.mixer.music.load("mp3.words.chart/" + sound + ".mp3")
                        pygame.mixer.music.play()
                        time.sleep(1)
                        #pygame.mixer.music.load("mp3.sounds.chart/" + sound + ".mp3")
                        #pygame.mixer.music.play()
                        #time.sleep(1)

                        #pygame.mixer.music.load("wav.words.robot/" + sound + ".wav")
                        #pygame.mixer.music.play()
                        #time.sleep(1)