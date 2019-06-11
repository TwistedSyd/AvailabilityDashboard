<template>
  <footer class="footer">
    <div class="container-fluid d-flex flex-wrap justify-content-between">
      <nav>
        <ul>
          <li>
            <router-link :to="{path:'/'}">Dashboard</router-link>
          </li>
        </ul>
      </nav>
      <div class="copyright d-flex flex-wrap">
        &copy; Created by<a href="https://github.com/TwistedSyd" target="_blank">&nbsp;Syd Koncz&nbsp;</a>using template from
        <a href="https://www.creative-tim.com/?ref=pdf-vuejs" target="_blank">&nbsp;Creative Tim.</a>
      </div>
    </div>
  </footer>
</template>
<script>
export default {};
</script>
<style>
</style>
