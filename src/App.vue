<template>
  <nav>
    <router-link to="/">Accueil</router-link> | 
    <router-link to="/publicapis">Public Apis</router-link> | 
    <router-link to="/cdn">CDN</router-link>
  </nav>
  <div id="view">
    <router-view></router-view>
  </div>
</template>