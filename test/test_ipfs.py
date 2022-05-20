import json
import os
import random


def test_random():
  random.seed('bacti')
  rng = int(random.random() * 1e17)
  assert rng == 27858566403785524
  random.seed('cookie')
  rng = int(random.random() * 1e17)
  assert rng == 13272970193615762
