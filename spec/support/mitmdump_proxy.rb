# frozen_string_literal: true

require "socket"

# This class is a wrapper around the mitmdump command line tool.
# It is used to save and replay HTTP traffic.
class MitmdumpProxy
  CASSETTE_DIR = File.join("spec", "fixtures", "mitmproxy_flows")

  def self.use_cassette(cassette_name)
    if File.exist?("#{CASSETTE_DIR}/#{cassette_name}.flows")
      start_replay_proxy(cassette_name)
    else
      start_record_proxy(cassette_name)
    end
  end

  def self.start_replay_proxy(cassette_name)
    command = [
      "mitmdump",
      "-s", "spec/support/mitmdump/replay_config.py",
      "--server-replay", "#{CASSETTE_DIR}/#{cassette_name}.flows",
      "--set", "connection_strategy=lazy",
      "--set", "server_replay_reuse=true"
    ]

    @pid = spawn(*command)
    Process.detach(@pid)
    wait_for_mitmdump_to_start
  end

  def self.start_record_proxy(cassette_name)
    command = [
      "mitmdump",
      "-s", "spec/support/mitmdump/record_config.py",
      "--save-stream-file", "#{CASSETTE_DIR}/#{cassette_name}.flows"
    ]

    @pid = spawn(*command)
    Process.detach(@pid)
    wait_for_mitmdump_to_start
  end

  def self.eject_cassette
    return if @pid.nil?

    Process.kill("TERM", @pid)
    @pid = nil
    Process.waitall
  end

  def self.wait_for_mitmdump_to_start
    loop do
      TCPSocket.new("localhost", 8080).close
      break
    rescue Errno::ECONNREFUSED
      sleep 0.2
    end
  end
end

at_exit do
  MitmdumpProxy.eject_cassette
end
